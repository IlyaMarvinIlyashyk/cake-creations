type NavProps = {
  onHome: () => void;
  onGallery: () => void;
  onContact: () => void;
};

const Nav = ({ onHome, onGallery, onContact }: NavProps) => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-10 flex gap-4">
      <button
        onClick={onHome}
        className="px-4 py-2 bg-pink-400 rounded-full text-white"
      >
        Home
      </button>
      <button
        onClick={onGallery}
        className="px-4 py-2 bg-pink-400 rounded-full text-white"
      >
        Gallery
      </button>
      <button
        onClick={onContact}
        className="px-4 py-2 bg-pink-400 rounded-full text-white"
      >
        Contact
      </button>
    </nav>
  );
};

export default Nav;
