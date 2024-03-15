import Avatar from "./UI/Avatar";

interface BlogDetailsPageProps {
  title: string;
  content: string;
  publishedDate: string;
  autherName: string;
  authorBio?: string;
}

export default function BlogDetail({
  title,
  content,
  publishedDate,
  autherName,
  authorBio = "",
}: BlogDetailsPageProps) {
  return (
    <div className="grid grid-cols-3  gap-x-6 mx-auto w-4/5 pt-5">
      <div className="col-span-2 flex flex-col gap-y-3">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <h5 className="font-medium text-gray-400 ">{`Posted on ${publishedDate}`}</h5>

        <p className="text-lg ">{content}</p>
      </div>
      <div className="col-span-1">
        <span className="text-sm font-medium">Authar</span>
        <div className="flex items-center gap-x-4">
          <Avatar username="Amli" />
          <div className="text-sm grow">
            <h3 className="font-bold capitalize text-2xl mb-1">{autherName}</h3>
            <p className="text-gray-400">{authorBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
