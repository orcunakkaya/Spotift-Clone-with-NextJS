import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
export async function GET(request, { params }) {

  const accessToken = headers().get('Authorization');
  try {

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    const { albumId } = params;

    if (!albumId) {
      return NextResponse.json({ error: 'Album ID is missing' }, { status: 400 });
    }

    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch album details' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching album details:', error);
    return NextResponse.json({ error: 'Failed to fetch album details' }, { status: 500 });
  }
}


// useEffect(() => {
//     const fetchAlbumDetails = async () => {
//       try {
//         const accessToken = 'YOUR_ACCESS_TOKEN'; // Access token'ı buraya ekleyin
//         const response = await fetch(`/api/albums/${params.albumId}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch album details');
//         }

//         const data = await response.json();
//         setAlbum(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbumDetails();
//   }, [params.albumId]);