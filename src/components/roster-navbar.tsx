'use client';

import { ChevronsRightIcon } from '@/icons/chevrons-right';
import { ToggleButtonGroup } from '@/ui/toggle-group';
import { VIEW_OPTIONS } from '@/components/roster/constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setView } from '@/store/slices/view-slice';

const RosterNavbar = () => {
    const view = useAppSelector((state) => state.view.view);
    const dispatch = useAppDispatch();

    return (
        <header className="w-full px-6 py-3.5 flex items-center justify-between border-b border-navbar-border">
            <div className="flex items-center space-x-6">
                <ChevronsRightIcon className="h-6 w-6 text-grey" />
                <h1>Provider Calendar</h1>
            </div>
            <ToggleButtonGroup
                options={VIEW_OPTIONS}
                variant="primary"
                selectedValue={view}
                onChange={(value) => dispatch(setView(value))}
            />
        </header>
    );
}

export default RosterNavbar;