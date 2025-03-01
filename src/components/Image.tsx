interface IProps {
  url?: string;
  alt: string;
  className: string;
}

const Image = ({ alt, className, url }: IProps) => {
  return <img src={url} alt={alt} className={className} />;
};

export default Image;
