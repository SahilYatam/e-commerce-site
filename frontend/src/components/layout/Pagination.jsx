export const Pagination = ({ page, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center gap-4 mt-6 py-2">
            <button
                disabled={page <= 1}
                onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50 cursor-pointer"
            >
                Prev
            </button>

            <span className="text-gray-600">Page {page}</span>

            <button
                disabled={page >= totalPages}
                onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50 cursor-pointer"
            >
                Next
            </button>
        </div>
    );
};
