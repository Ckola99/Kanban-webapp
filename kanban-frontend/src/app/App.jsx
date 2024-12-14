import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import WorkPage from '../pages/WorkPage';

function App() {

	return (
		<Router>
			<Routes>
				<Route index path="/" element={<HomePage />} />
				<Route path="/workpage" element={<WorkPage />}/>
			</Routes>
		</Router>
	);
}

export default App;
