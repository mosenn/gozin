'use client';

import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function MoviesPagination({
  currentPage,
  totalPages,
}: Props) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    return `/movies?${params.toString()}`;
  };

  const pages = [];

  if (currentPage > 2) {
    pages.push(1);
  }

  if (currentPage > 3) {
    pages.push('ellipsis-start');
  }

  for (
    let page = Math.max(1, currentPage - 1);
    page <= Math.min(totalPages, currentPage + 1);
    page++
  ) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push('ellipsis-end');
  }

  if (currentPage < totalPages - 1) {
    pages.push(totalPages);
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {pages.map((page) => {
          if (typeof page === 'string') {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}