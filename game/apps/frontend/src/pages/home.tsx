import { Start } from "../components/start";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          WELCOME TO THE DUNGEON
        </h1>
      </div>
      <div>
        <Start />
      </div>
    </div>
  );
};
