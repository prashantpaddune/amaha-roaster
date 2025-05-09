import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { fetchProviders, setProviders } from "@/store/slices/provider-slice";
import { applyUrlFilters, serializeFilters } from "@/utils/filters";
import { Provider } from "@/components/types";
import { resetFilters, setSearch } from "@/store/slices/filter-slice";

type Props = {
    initialProviders: Provider[];
}

const useGetProvidersFilters = ({ initialProviders }: Props) => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((s) => s.filters);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        dispatch(setProviders(initialProviders));
        applyUrlFilters(searchParams, dispatch);
    }, [dispatch, initialProviders, searchParams]);

    const applyFilters = () => {
        const newFilters = serializeFilters(filters);
        router.replace(newFilters ? `?${newFilters}` : window.location.pathname);
        dispatch(fetchProviders(filters));
    };

    const onReset = () => {
        dispatch(resetFilters());
        router.replace(window.location.pathname);
        dispatch(fetchProviders({ service: '', type: '', centre: '', search: '' }));
    };

    const onSearchChange = (value: string) => {
        dispatch(setSearch(value));
        dispatch(fetchProviders({ ...filters, search: value }));
    };

    const appliedParams = Object.fromEntries(searchParams.entries());
    const showResetBtn = Boolean(appliedParams.service || appliedParams.type || appliedParams.centre || appliedParams.search);

    return {
        filters,
        applyFilters,
        onReset,
        onSearchChange,
        showResetBtn
    }
}

export default useGetProvidersFilters