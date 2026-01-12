import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      Resume Builder

      <div className='grid grid-cols-2'>
        <div className="border-2 border-amber-500">
          <h2>Inventory</h2>
          <div className="flex items-center gap-2 p-2">
            <button className="px-4 py-2 bg-blue-400" style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}>
              Create Zone Block
            </button>
            <button>Create Section Block</button>
            <button>Create Label Block</button>
          </div>
        </div>
        <div className="border-2 border-sky-500">
          <h2>Baseplate</h2>
        </div>
      </div>
    </div>
  );
}

// This doesn't seem to work well f 