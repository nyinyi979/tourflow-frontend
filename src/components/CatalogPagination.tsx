import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";

const getPageHref = (
  pathname: string,
  values: object,
  page: number,
) => {
  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "string" && value) params.set(key, value);
  });
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
};

export function CatalogPagination({
  pathname,
  page,
  pageCount,
  searchValues,
}: {
  pathname: string;
  page: number;
  pageCount: number;
  searchValues: object;
}) {
  if (pageCount <= 1) return null;

  const first = Math.max(1, Math.min(page - 2, pageCount - 4));
  const last = Math.min(pageCount, first + 4);
  const pages = Array.from({ length: last - first + 1 }, (_, index) =>
    first + index,
  );

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPageHref(pathname, searchValues, Math.max(1, page - 1))}
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-40" : ""}
          />
        </PaginationItem>
        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={getPageHref(pathname, searchValues, pageNumber)}
              isActive={pageNumber === page}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={getPageHref(
              pathname,
              searchValues,
              Math.min(pageCount, page + 1),
            )}
            aria-disabled={page === pageCount}
            className={
              page === pageCount ? "pointer-events-none opacity-40" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
