export default interface ViewCardData {
  id: string; // needs to be a string to allow it to be passed through components
  title: string;
  description: string;
  routeTo: string;
}
