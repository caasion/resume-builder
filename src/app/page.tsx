import Image from "next/image";
import LabelBlock from "./_components/LabelBlock";
import SectionBlock from "./_components/SectionBlock";
import ZoneBlock from "./_components/ZoneBlock";

export default function Home() {
  return (
    <div className="">
      Resume Builder

      <div className='grid grid-cols-2'>
        <div className="border-2 border-amber-500 p-2">
          <h2>Inventory</h2>
          <div className="flex items-center gap-2 mb-4">
            <button className="px-4 py-2 bg-blue-400" style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}>
              Create Zone Block
            </button>
            <button className="px-4 py-2 bg-blue-400" style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}>
              Create Section Block
            </button>
            <button className="px-4 py-2 bg-blue-400" style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}>
              Create Label Block
            </button>
          </div>

          <div className="bg-green-600 p-2 mb-2">
            <div className="text-2xl border-purple-400 border-2 mb-1">Section Label</div>
            <hr className="mb-1"></hr>
            <div className="bg-red-700 p-2 mb-2">
              <div className="flex justify-between w-ful">
                <div className="border-purple-400 border-2">Company</div>
                <div className="border-purple-400 border-2">Location</div>
              </div>
              <div className="flex justify-between w-full">
                <LabelBlock type="bold">Job Role</LabelBlock>
                <div className="border-purple-400 border-2">Dates</div>
              </div>
              <div>
                <ul className="border-purple-400 border-2">
                  <li>desc 1</li>
                  <li>desc 2</li>
                  <li>desc 3</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-700 p-2 mb-2">
              <div className="flex justify-between w-ful">
                <div className="border-purple-400 border-2">Company</div>
                <div className="border-purple-400 border-2">Location</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="border-purple-400 border-2">Job Role</div>
                <div className="border-purple-400 border-2">Dates</div>
              </div>
              <div>
                <ul className="border-purple-400 border-2">
                  <li>desc 1</li>
                  <li>desc 2</li>
                  <li>desc 3</li>
                </ul>
              </div>
            </div>
          </div>

          <ZoneBlock 
              sectionLabel={<LabelBlock type='section'>Section</LabelBlock>}
            >
              <SectionBlock 
                company={<LabelBlock>University of Waterloo</LabelBlock>}
                role={<LabelBlock>Software Engineer</LabelBlock>}
                location={<LabelBlock>Location</LabelBlock>}
                dates={<LabelBlock>Dates</LabelBlock>}
              >
                <LabelBlock>Desc 1</LabelBlock>
                <LabelBlock>Desc 2</LabelBlock>
                <LabelBlock>Desc 3</LabelBlock>
              </SectionBlock>
            </ZoneBlock>

          <div className="bg-green-600 p-2">
            <div className="text-2xl border-purple-400 border-2 mb-1">Section Label</div>
            <hr className="mb-1"></hr>
            <div className="bg-red-700 p-2">
              <div className="flex justify-between w-ful">
                <div className="border-purple-400 border-2">Company</div>
                <div className="border-purple-400 border-2">Location</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="border-purple-400 border-2">Job Role</div>
                <div className="border-purple-400 border-2">Dates</div>
              </div>
              <div>
                <ul className="border-purple-400 border-2">
                  <li>desc 1</li>
                  <li>desc 2</li>
                  <li>desc 3</li>
                </ul>
              </div> 
            </div>
          </div>
 
          <div className="bg-green-600 p-2">
            <div className="text-2xl border-purple-400 border-2 mb-1">Section Label</div>
            <hr className="mb-1"></hr>
            <div className="bg-red-700 p-2">
              <div>
                <ul className="border-purple-400 border-2">
                  <li>desc 1</li>
                  <li>desc 2</li>
                  <li>desc 3</li>
                </ul>
              </div>
            </div>
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