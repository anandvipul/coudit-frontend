export default function Aside(props) {
  return (
    <>
      <aside className="aside">
        <div className="aside-title">Popular Tags</div>
        <div className="tag-items-container">
          {props.tags.map((item, index) => {
            return (
              <p
                key={index}
                className="tag-item"
                onClick={(item) => {
                  props.activeTagHandler(item);
                }}
              >
                {item}
              </p>
            );
          })}
        </div>
      </aside>
    </>
  );
}
