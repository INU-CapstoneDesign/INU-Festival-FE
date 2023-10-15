import styled from "styled-components"

const FestivalSentenceBox =styled.div`
    background-color: #F8F8FA;
    width: 390px;
    height: 73px;
    top: 483px;
    left: 20px;
    border-radius: 12px;
    display:flex;
    justify-around:space-between;
    align-items:center;
`
152
const BallonBox = styled.div`
        display:flex;
        flex-direction:column;
        justify-content: center;

        div{
           color: rgba(147, 147, 147, 1);
            font-family: SF Pro;
            font-size: 12px;
            font-style: normal;
            font-weight: 510;
            line-height: 21px; /* 175% */
            letter-spacing: -0.36px;
            margin-left:12px;
            margin-right:10px;
        }

        img{
            width: 34px;
            height: 30.16px;
            top: 496px;
            left: 44px;
            margin-left:24px;
        }
`

const SentenceBox =styled.div`
        color: #0042B9;
        font-family: SF Pro;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 21px; /* 131.25% */
        letter-spacing: -0.48px;
        margin-left:13px;
`
const WordContainer=styled.div`
        display:flex;

`
const Word = styled.div`
    margin-top:19px;
    margin-right:10px;
    width: 76px;
    height: 38px;
    flex-shrink: 0;
    border-radius: 33px;
    background: #F8F8FA;
    text-align:center;
    line-height:38px;
    color: #3A3A3A;
    font-family: SF Pro;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.26px;
`


export default function FestivalSentence(){
    return(
        <>
            <FestivalSentenceBox>
                <BallonBox>
                    <img src="ballon.png" alt="말풍선"/>
                    <div>201902929</div>  {/* 데이터 들어오면 바뀜 */}
                </BallonBox>
                <SentenceBox>
                    퇴근길에 이런 유익한 글을 보니 기분이 좋네요. {/* 데이터 들어오면 바뀜 */}
                </SentenceBox>
            </FestivalSentenceBox>

            <WordContainer>  {/* 데이터 들어오면 바뀜 */}
                <Word>아이브</Word>
                <Word>주점</Word>
                <Word>양꼬치</Word>
                <Word>족발</Word>
                <Word>찜/탕</Word>
            </WordContainer>
        </>
    )
}