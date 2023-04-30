import LoaderScreen from "../Pages/LoaderScreen";

export default function Aside(props) {
  return (
    <>
      <aside className="aside">
        <div className="aside-title">Popular Tags</div>
        <div className="tag-items-container">
          {props.tags.length ? (
            props.tags.map((item, index) => {
              return (
                <p
                  key={index}
                  className="tag-item"
                  onClick={(event) => {
                    props.activeTagHandler(event.target.innerText);
                    props.activeModeChanger("tags");
                  }}
                >
                  {item}
                </p>
              );
            })
          ) : (
            <LoaderScreen />
          )}
          {/* {props.tags.map((item, index) => {
            return (
              <p
                key={index}
                className="tag-item"
                onClick={(event) => {
                  props.activeTagHandler(event.target.innerText);
                  props.activeModeChanger("tags");
                }}
              >
                {item}
              </p>
            );
          })} */}
        </div>
      </aside>
    </>
  );
}
