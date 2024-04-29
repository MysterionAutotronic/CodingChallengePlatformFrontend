import "./Loader.css";

interface LoaderProps {
    width: number;
    height: number;
    borderWidth: number;
}

const Loader = ({width, height, borderWidth}: LoaderProps) => {
    const loaderStyle = {
        width,
        height,
        borderWidth: borderWidth
    }

    return (
        <span className="loader" style={loaderStyle}></span>
    );
};

export default Loader;