export default function CustomMenu({ innerRef, innerProps, isDisabled, children }) {
  return (
    <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
      {children}
      <button className="btn btn-info btn-sm btn-block">Add New</button>
    </div>
  );
}
