import { Route, Routes } from 'react-router'
import './styles/App.css'
import Loginoverview from './components/login/Loginoverview'
import LoginWithBadge from './components/login/LoginWithBadge'
import LoginWithEmailAndPassword from './components/login/LoginWithUsernameAndPassword'
import LoginAsGuest from './components/login/LoginAsGuest'
import Start from './components/Start'
import Gameoverview from './components/GameOverview/Gamesoverview'
import Register from './components/register/Register'
import BlackJackGame from './components/Games/BlackJack'
import Mines from './components/Games/Mines'
import CreateAvatar from './components/register/CreateAvatar'
import Logout from './components/logout/Logout'
import EditProfile from './components/editProfile/EditProfile'
import Settings from './components/Settings'
import BlackJackInfo from './components/gameinformations/BlackjackInfo'
import Leaderboard from './components/Leaderboard'
import HorseRace from './components/Games/HorseRace'
import HorseRaceInfo from './components/gameinformations/HorseRaceInfo'
import MyGames from './components/lastgames/MyGames'
import MinenfeldInfo from './components/gameinformations/MinenfeldInfo'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login-overview' element={<Loginoverview />} />
        <Route path='/login-with-badge' element={<LoginWithBadge />} />
        <Route path='/login-as-guest' element={<LoginAsGuest />} />
        <Route path='/login-with-email-and-password' element={<LoginWithEmailAndPassword />} />
        <Route path='/gameoverview' element={<Gameoverview />} />
        <Route path='/register' element={<Register />} />
        <Route path='/gameoverview/blackjack' element={<BlackJackGame />} />
        <Route path='/gameoverview/mines' element={<Mines />} />
        <Route path='/create-avatar' element={<CreateAvatar />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/gameoverview/blackjack/info' element={<BlackJackInfo />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/gameoverview/horserace' element={<HorseRace />} />
        <Route path="/gameoverview/horserace/info" element={<HorseRaceInfo />} />
        <Route path="/gameoverview/mines/info" element={<MinenfeldInfo />} />
        <Route path="/gaminghistory" element={<MyGames />} />
      </Routes>
    </>
  )
}

export default App
