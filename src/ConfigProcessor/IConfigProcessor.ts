export default interface IConfigProcessor<I, O> {
  process(input: I): O;
}
