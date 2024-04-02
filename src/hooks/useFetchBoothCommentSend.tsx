import { useFetch } from 'usehooks-ts';
import SendComment from '../types/SendComment';

export default function useFetchBoothCommentSend(id: string, emoji:string, content:string) {
  const url = `${process.env.REACT_APP_URL}/booth/comment/${id}`;

  const { data } = useFetch<SendComment>(url).post({
    content,
    emoji,
    boothId: id,
  });

  if (!data) {
    return [];
  }

  console.log(data.boothComments);

  return data.boothComments;
}
