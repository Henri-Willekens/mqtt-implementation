export default interface OrthogonalLineProps {
  from: any,
  to: any,
  fromConnectionPosition: 'top' | 'right' | 'bottom' | 'left',
  toConnectionPosition: 'top' | 'right' | 'bottom' | 'left',
  type: 'pipe' | 'connection',
  content?: 'clean-water' | 'fuel' | 'lub-oil' | 'sea-water'
};