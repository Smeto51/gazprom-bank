import { Comment } from "../hooks/useComments";

export const CommentItem = ({ c, index }: { c: Comment; index: number }) => (
  <li
    key={c.id}
    className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm
               hover:shadow-2xl hover:border-indigo-200 transition-all hover:-translate-y-2
                duration-300"
  >
    <div className="flex gap-3 items-center">
      <div
        className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500
                   flex justify-center items-center text-white font-bold group-hover:scale-110 duration-300"
      >
        {index}
      </div>
      <div className="w-px bg-gray-200 self-stretch" />
      <div>
        <p className="mt-2 text-gray-800 whitespace-pre-wrap leading-relaxed">
          {c.text}
        </p>
        <p className="text-[12px] text-gray-500 group-hover:text-blue-500">
          {new Date(c.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  </li>
);
