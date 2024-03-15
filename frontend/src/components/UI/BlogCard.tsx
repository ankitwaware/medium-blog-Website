import Avatar from "./Avatar";
import iconPath from "../../assets/icons8-blog-64.png";
import { Link } from "react-router-dom";
interface BlogCardProps {
  username: string;
  blogId: string;
  publishedDate: string;
  title: string;
  content: string;
  iconSrc?: string;
}

export default function BlogCard({
  username,
  blogId,
  publishedDate,
  title,
  content,
  iconSrc = iconPath,
}: BlogCardProps) {
  return (
    <div className="flex items-center  justify-evenly gap-x-12 border-b-2 py-4">
      <Link to={`blog/${blogId}`}>
        <div className="text-gray-950 grid gap-y-1">
          <div className="flex items-center gap-x-2 text-sm">
            <Avatar username={username} />
            <span className=" font-medium">{username}</span>
            <span className="text-slate-400">{publishedDate}</span>
          </div>
          <h2 className="text-2xl font-bold line-clamp-2">{title}</h2>
          <h4 className="line-clamp-2 font-medium">{content}</h4>

          <div className="flex mt-3">
            <span className="text-xs">{`${Math.ceil(
              content.length / 100
            )} min read`}</span>
          </div>
        </div>
      </Link>
      <img src={iconSrc} className="size-16" />
    </div>
  );
}
