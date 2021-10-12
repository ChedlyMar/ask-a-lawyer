export interface IConversation {
  _id?: string,
  userId: string,
  lawyerId: string,
  createdAt: string,
  updatedAt: string
}

export interface IConversations {
  conversation: IConversation[],
  selectedConversation: string
}