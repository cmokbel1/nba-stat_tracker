import logo from '../images/nba-logo-black-transparent.png';


export const Foot = () => {
    return (
        <div className="site-footer">
            <div className="site-footer-links">
                <a href="https://nba.com"  target="_blank" rel="noreferrer" alt="nba website" className="footer-link">NBA.com</a>
                <a href="https://claudemokbel.com" target="_blank" rel="noreferrer" alt="my portfolio website" className="footer-link">Portfolio</a>
                <a href="https://rapidapi.com/api-sports/api/api-nba/" target="_blank" rel="noreferrer" alt="api used to make this app" className="footer-link">API</a>
                <a href="https://github.com/cmokbel1" target="_blank" rel="noreferrer" alt="my github" className="footer-link">Github</a>                
            </div>
            <div className="site-footer-disclaimer">
                <p>all team logos are property of the NBA, I hold no rights to these images and am strictly using them for educational purposes.
                    I do not make any money from this website and merely built this website to hone my skills of web development.
                </p>
            </div>
            <div className="nba-logo">
                <img src={logo} alt="nba logo" />
            </div>
        </div>
    )
}