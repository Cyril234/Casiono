import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export function useBadgeScanner(onScan: (scan: string) => void) {
    const inputBuffer = useRef("");
    const timeoutRef = useRef<number | null>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.length === 1) {
                inputBuffer.current += e.key;
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(async () => {
                    if (inputBuffer.current.length > 0) {
                        const match = inputBuffer.current.match(/UID:(.*?);/);
                        if (match) {
                            try {
                                const res = await fetch("http://localhost:8080/api/loginUID", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ uid: match[1] }),
                                });
                                const responseText = await res.text();
                                let data;
                                try {
                                    data = JSON.parse(responseText);
                                } catch (e) {
                                    throw new Error("Antwort ist kein gültiges JSON: " + responseText);
                                }

                                if (!res.ok) {
                                    throw new Error(`Server returned ${res.status}: ${responseText}`);
                                }

                                const token = data.token;
                                if (!token) throw new Error("Kein Token erhalten");

                                sessionStorage.setItem("authToken", token);

                                const responsePlayer = await fetch(`http://localhost:8080/api/players/byToken/${token}`, {
                                    method: "GET",
                                    headers: {
                                        "Authorization": `Bearer ${token}`,
                                        Accept: "*/*",
                                        "Content-Type": "application/json"
                                    }
                                });

                                if (!responsePlayer.ok) {
                                    throw new Error(`HTTP Fehler: ${responsePlayer.status}`);
                                }
                                const userdata = await responsePlayer.json();
                                sessionStorage.setItem("username", userdata.username);

                                if (userdata.username !== "supergeheim!ZurSicherheit_1234_geheim_sodass_niemand_unberechtigtes_auf_diese_Seite_zugreiffen_kann_1267") {
                                    navigate("/gameoverview");
                                } else {
                                    navigate("/login-with-badge/form");
                                }

                            } catch (err) {
                                console.error(err);
                            }
                        }
                        onScan(inputBuffer.current);
                        inputBuffer.current = "";
                    }
                }, 300);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [onScan, navigate]);
}
