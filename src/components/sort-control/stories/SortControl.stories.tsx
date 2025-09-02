import type { Meta, StoryObj } from '@storybook/react';
import SortControl from '../SortControl';
import { SortOption } from '../models/sort-control.models';
import { useArgs } from 'storybook/internal/preview-api';
import React from 'react';

const meta: Meta<typeof SortControl> = {
  title: 'components/SortControl',
  component: SortControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A Sort Control component',
      },
    },
  },
  argTypes: {
    currentSelection: {
      control: { type: 'select' },
      options: ['releaseDate', 'title'],
      description: 'Current selected sort option',
    },
    onSelectionChange: {
      action: 'selection changed',
      description: 'Callback function called when selection changes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentSelection: 'releaseDate',
    onSelectionChange: (selection: SortOption) => {
      console.log('Selection changed to:', selection);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default sort control',
      },
    },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ selectedSortOption }, updateArgs] = useArgs();
    return (
      <SortControl
        {...(args as React.ComponentProps<typeof SortControl>)}
        currentSelection={selectedSortOption}
        onSelectionChange={(sortOption) => updateArgs({ currentSelection: sortOption })}
      />
    );
  },
};
