import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import './Trailer.css';

const Trailer = () => {
    let params = useParams();
    let id  = params.ytTrailerId;
    return(
        <div className="react-player-container">
            {
                (id!=null)?<ReactPlayer controls="true" playing={true} url={`https://www.youtube.com/watch?v=${id}`}
                width='100%' height='100%' />:null
            }
        </div>
    )
}
export default Trailer;