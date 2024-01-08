import { styled } from 'styled-components';

import Notice from '../../types/Notice';

type NoticeItemProps = {
    notice: Notice;
}

export default function NoticeBottom( {notice} : NoticeItemProps ){

    const NoticeContentBox = styled.div`
        background-color: #EBF2FF;
        margin-top: 2.3rem;
        padding: 2rem;
        border-radius: 10px;
        font-weight: 350;
        line-height: 2.5rem; /* 160% */
        letter-spacing: -0.04348rem;
        white-space: pre-line;
    `;

    const NoticeImageContainer = styled.div`
        border-radius: 1rem;
        display: flex;
        overflow: auto;
    `

    const NoticeImageBox = styled.img`
        width: 15rem;
        border-radius: 1rem;
        margin: 2rem 0.6rem;
    `

    return(
        <NoticeContentBox>
            {notice.content}
            <NoticeImageContainer>
            {
                notice.img.map((imgsrc, index) => (
                    <NoticeImageBox key={index} src={imgsrc} />
                ))}                
            </NoticeImageContainer>
        </NoticeContentBox>
    )



}