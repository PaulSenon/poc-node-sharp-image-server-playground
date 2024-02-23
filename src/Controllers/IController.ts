export default interface IController {
  processRequest(request: Express.Request, response: Express.Response): void | Promise<void>;
}
