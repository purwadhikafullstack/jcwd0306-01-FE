export const Address = ({ location = "checkout" }) => {
  return (
    <div className="d-flex flex-column gap-1">
      {location === "checkout_modal" ? (
        <div className="text-secondary">(Location name)</div>
      ) : null}
      <div className="d-flex gap-2">
        <span>
          <b>Name</b>
        </span>
        {location === "checkout" ? <span>(Location name)</span> : null}
      </div>
      <div>081313131313</div>
      <p style={{ fontSize: "0.9em" }}>
        Address here Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book.
      </p>
    </div>
  );
};
