import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ContentHandlerType, Operation, ApiResponse } from '@/types'

type Props = {
  operation: Operation
  type: ContentHandlerType
  apiResponse: ApiResponse
  isItemsValid: boolean
  saveAction: () => Promise<void>
}
export const CollectionSaveUpdatedItems = ({
  operation,
  type,
  apiResponse,
  isItemsValid,
  saveAction,
}: Props) => {
  return (
    operation === 'update-items' &&
    type !== 'topic' && (
      <section aria-labelledby={operation}>
        <div>
          <h2 id={operation}>{`Edit' ${type} collection`}</h2>
        </div>
        <div className="form-row">
          <button disabled={!isItemsValid} onClick={saveAction}>
            Save updated collection items
          </button>
          <ApiResponseMessage apiResponse={apiResponse} />
        </div>
      </section>
    )
  )
}
