import Pagination from "react-bootstrap/Pagination";

const PaginationBasic = ({ page, todos, setCurrentPage, totalIems }) => {
  let active = page;

  const handlePagination = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  let totalPages = Math.ceil(totalIems / 5);

  let items = [];
  for (let number = 0; number < totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => handlePagination(number)}
        active={number === active}
      >
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <div className="float-end">
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
};

export default PaginationBasic;
