import NotFound from './assets/notfound.jpg';

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4">
      <img
        src={NotFound}
        alt="Not Found"
        className="max-w-full h-auto object-contain rounded-lg shadow-md"
      />
    </div>
  );
};

export default NotFoundPage;
