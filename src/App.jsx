import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [newNote, setNewNote] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("notes");
    if (storedData) {
      setNewNote(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(newNote));
  }, [newNote]);

  const handleNewNote = () => {
    setNewNote([...newNote, { title: "", description: "" }]);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = newNote.filter((_, i) => i !== index);
    setNewNote(updatedNotes);
  };

  const handleTitle = (e, index) => {
    const updatedNotes = [...newNote];
    updatedNotes[index].title = e.target.value;
    setNewNote(updatedNotes);
  };

  const handleDescription = (e, index) => {
    const updatedNotes = [...newNote];
    updatedNotes[index].description = e.target.value;
    setNewNote(updatedNotes);
  };

  return (
    <div className="my-10 mx-auto container h-screen max-w-[900px]">
      <div className="flex flex-col gap-10 items-center h-full">
        <h1 className="font-bold text-3xl">Sticky Notes</h1>
        <div className="flex flex-col md:flex-row  gap-5">
          <input
            type="text"
            placeholder="search note"
            className="border border-black w-72 p-2 rounded"
          />
          <button
            className="px-4 py-2 bg-[#d1ed58] hover:bg-[#abce15] rounded border-2 border-black font-bold"
            onClick={handleNewNote}
          >
            + New Note
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 ">
          {newNote.length > 0
            ? newNote.map((note, index) => (
                <div
                  key={index}
                  className="flex flex-col border bg-[#ffff99] w-[200px] h-[200px] relative "
                >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    className="bg-transparent w-full p-2 border-2 border-gray-600 outline-none placeholder:italic placeholder:text-gray-600"
                    value={note.title}
                    onChange={(e) => handleTitle(e, index)}
                  />
                  <textarea
                    name="desc"
                    id="desc"
                    placeholder="Description"
                    className="bg-transparent w-full h-full resize-none p-2 outline-none border border-gray-600 placeholder:italic placeholder:text-gray-600"
                    value={note.description}
                    onChange={(e) => handleDescription(e, index)}
                  ></textarea>
                  <span
                    className="absolute top-0 right-0 p-2 cursor-pointer"
                    onClick={() => handleDeleteNote(index)}
                  >
                    X
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
