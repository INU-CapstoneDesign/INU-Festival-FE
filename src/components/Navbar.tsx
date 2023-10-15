import styled from "styled-components";

const MiniBox = styled.div`
    align-items: center;
    padding-inline: .6em;
    text-align: center;
    font-size: 0.86rem;

    img {
        color: white;
        margin: auto;
        display: block;
        padding-bottom: 0.9em;         
    }
`

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1.0em;
    padding-inline: 1.8em;
    border-radius: 1.45rem 1.45rem 0 0;
    color: white;
`

export default function Navbar(){
    return (
        <Box>
            <MiniBox>
                <img src="home.png" alt="홈" />
                <span>홈</span>
            </MiniBox>

            <MiniBox>
                <img src="map.png" alt="지도" />
                <span>지도</span>
            </MiniBox>

            <MiniBox>
                <img src="timetable.png" alt="타임테이블" />
                <span>타임테이블</span>
            </MiniBox>

            <MiniBox>
                <img src="board.png" alt="방명록" />
                <span>방명록</span>
            </MiniBox>

            <MiniBox>
                <img src="profile.png" alt="프로필" />
                <span>프로필</span>
            </MiniBox>
        </Box>
	);
}