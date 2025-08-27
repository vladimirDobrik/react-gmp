import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GenreList from '../GenreList';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof GenreList> = {
  title: 'components/GenreList',
  component: GenreList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A GenreList component that allows selecting genre from a list.',
      },
    },
  },
  args: {
    genres: ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'],
    selectedGenre: 'All',
  },
  argTypes: {
    genres: {
      control: { type: 'object' },
      description: 'The list of genres',
      defaultValue: ['All', 'Documentary', 'Comedy', 'Horror', 'Crime']
    },
    selectedGenre: {
      control: { type: 'radio'},
      options: ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'],
      description: 'Currently selected genre',
      defaultValue: 'All',
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    genres: ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'],
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ selectedGenre }, updateArgs] = useArgs();
    return (
      <GenreList
        {...(args as React.ComponentProps<typeof GenreList>)}
        genres={['All', 'Documentary', 'Comedy', 'Horror', 'Crime']}
        selectedGenre={selectedGenre}
        onSelect={(genre) => updateArgs({ selectedGenre: genre })}
      />
    );
  },
};

export const EmptyList: Story = {
  args: {
    genres: [],
  },
};
