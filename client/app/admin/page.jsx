// app/otherapp/page.jsx
import { redirect } from 'next/navigation';

export default function OtherAppRedirect() {
  redirect('http://localhost:5173');
}
