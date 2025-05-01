import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLaunches = async () => {
  const res = await axios.get('https://api.spacexdata.com/v4/launches');
  return res.data;
};

const getYoutubeThumbnail = (webcastUrl) => {
  if (!webcastUrl) return '';
  const match = webcastUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
};

const SpaceXPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['spacex'],
    queryFn: fetchLaunches,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  if (isLoading) return <p>Loading launches...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary">🚀 SpaceX Launches</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {data.map((launch) => {
          const youtubeThumb = getYoutubeThumbnail(launch.links?.webcast);
          const patchImg = launch.links?.patch?.small;

          const finalImg =
            youtubeThumb || patchImg || 'https://via.placeholder.com/400x200?text=No+Image';

          return (
            <div key={launch.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <a
                  href={launch.links?.webcast || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block"
                >
                  <img
                    src={finalImg}
                    className="card-img-top"
                    alt={launch.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </a>

                <div className="card-body">
                  <h5 className="card-title">{launch.name}</h5>
                  <p className="card-text">
                    {launch.details
                      ? launch.details.slice(0, 120) + '...'
                      : 'No details available.'}
                  </p>
                  <p className="text-muted mb-0">
                    <strong>Launch Date:</strong>{' '}
                    {new Date(launch.date_utc).toLocaleString()}
                  </p>
                </div>

                <div className="card-footer bg-white text-center">
                  {launch.links?.webcast ? (
                    <a
                      href={launch.links.webcast}
                      className="btn btn-sm btn-outline-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Launch 🚀
                    </a>
                  ) : (
                    <button className="btn btn-sm btn-outline-secondary" disabled>
                      No Webcast Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpaceXPage;
