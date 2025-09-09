import type { Meta, StoryObj } from '@storybook/react';
import Header from '../Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Optional children to render in the header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithTitle: Story = {
  args: {
    children: <h1>Find your movie</h1>,
  },
};

export const WithButtons: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#ff6b6b', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Add Movie
        </button>
        <button style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: 'transparent', 
          color: 'white', 
          border: '1px solid white', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Settings
        </button>
      </div>
    ),
  },
};

export const WithSearchBar: Story = {
  args: {
    children: (
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        alignItems: 'center',
        width: '400px'
      }}>
        <input 
          type="text" 
          placeholder="Search movies..." 
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        <button style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#ff6b6b', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Search
        </button>
      </div>
    ),
  },
};

export const WithTitleAndSearch: Story = {
  args: {
    children: (
      <>
        <h1>Find your movie</h1>
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          alignItems: 'center',
          width: '400px'
        }}>
          <input 
            type="text" 
            placeholder="Search movies..." 
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          <button style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#ff6b6b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Search
          </button>
        </div>
      </>
    ),
  },
};
