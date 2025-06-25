import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ContentHandlerType, Operation, ApiResponse } from '@/types'

type Props = {
  operation: Operation
  type: ContentHandlerType
  apiResponse: ApiResponse
  isValid: boolean
  saveAction: () => Promise<void>
  operationMessage: ApiResponse
}
export const CollectionSaveItems = ({
  operation,
  type,
  apiResponse,
  isValid,
  saveAction,
  operationMessage,
}: Props) => {
  return (
    operation === 'create' && (
      <section aria-labelledby={operation}>
        <div>
          <h2 id="create-collection">Create {type} collection</h2>
        </div>
        <div className="form-row">
          <button disabled={!isValid} onClick={saveAction}>
            Create collection
          </button>
          <ApiResponseMessage apiResponse={operationMessage} />
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </section>
    )
  )
}
