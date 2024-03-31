/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import { TaskT } from "../../types";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditTask: (taskData: any) => void;
  task: TaskT;
}

const EditModal = ({
  isOpen,
  onClose,
  setOpen,
  handleEditTask: handleEditTask,
  task,
}: EditModalProps) => {
  const currTaskData = {
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    image: task.image,
    alt: task.alt,
    duedate: task.duedate,
    tags: task.tags,
  };
  const [taskData, setTaskData] = useState(currTaskData);
  const [tagTitle, setTagTitle] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag: Tag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(currTaskData);
  };

  const handleSubmit = () => {
    handleEditTask(taskData);
    closeModal();
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />

        <select
          name="priority"
          className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
          onChange={handleChange}
          value={taskData.priority}
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

				<input
					type="text"
					name="duedate"
					value={taskData.duedate}
					onChange={handleChange}
					placeholder="Due Date"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				/>

        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <button
          className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
        <div className="w-full">
          {taskData.tags && <span>Tags:</span>}
          {taskData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center gap-4 justify-between">
        <input
          type="text"
          name="alt"
          value={taskData.alt}
          onChange={handleChange}
          placeholder="Image Alt"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <input type="file" name="image" onChange={handleImageChange} className="w-full" />
        </div>
        <button className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium" onClick={handleSubmit}>Edit Task</button>
      </div>
    </div>
  );
};

export default EditModal;
