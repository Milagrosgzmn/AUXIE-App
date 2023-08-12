import Cookies from 'universal-cookie'

const cookies = new Cookies()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppWrapper = ({ children, setIsInChat }) => {
  
    cookies.remove('auth-token')
  

    return (
        <div className="App">
            <div className="app-header">
                <h1> Chat App </h1>
            </div>

            <div className="app-container">{children}</div>
        </div>
    )
}