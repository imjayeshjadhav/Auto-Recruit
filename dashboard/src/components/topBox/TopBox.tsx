import "./topBox.scss"
import { topInterviewers} from "../../data.ts"

const TopBox = () => {
  return (
    <div className="topBox">
      <h1 className="top-heading">Top Performers</h1>
      <div className="list">
        {topInterviewers.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.name}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.rating}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox