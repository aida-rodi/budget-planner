import { Link } from "react-router-dom"

function Welcome() {
    return (
        <div className="welcomeDiv">
            <h1>Welcome</h1>
            <h4>In this website you will be able to make a budget.</h4>
            <button className="startButton">
                <Link to="/budget">New budget</Link>
            </button>
        </div>
    )
}

export default Welcome