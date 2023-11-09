import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EVENT_PROPS, editEvent, showEvent } from '../service/eventApi'
import { setEvent } from '../store/eventSlice'

const ContentVendor = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<EVENT_PROPS>({})
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEventDateVisible, setEventDateVisible] = useState(false)
  const [isEventReasonVisible, setEventReasonVisible] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const eventData = useSelector((state: any) => state.event.data)

  const handleShowData = async () => {
    try {
      const response = await showEvent()

      dispatch(setEvent(response.result))
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    handleShowData()
  }, [dispatch])

  const handleAccept = () => {
    setEventDateVisible(true)
    // You can add logic here to save the Event Date
  }

  const handleReject = () => {
    setEventReasonVisible(true)
    // You can add logic here to save the Event Reason
  }

  const handleCloseModal = () => {
    setEventDateVisible(false) // Menutup tampilan tanggal (jika terbuka)
    setEventReasonVisible(false) // Menutup tampilan alasan (jika terbuka)
    setModalOpen(false) // Menutup modal
  }

  const handleEditData = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await editEvent(formData)

    if (response.result === null) {
      await handleShowData()

      setFormData({})

      setModalOpen(false)

      toast.success(response.message)

      const modalBackdrop = document.querySelector('.modal-backdrop')
      if (modalBackdrop) {
        modalBackdrop.remove()
      }
    } else {
      toast.error(response.message)
    }
  }

  return (
    <>
      {/* Page Content */}
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Events</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Events</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-striped custom-table mb-0 datatable">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Company</th>
                    <th>Vendor</th>
                    <th>Date</th>
                    <th className="text-center">Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData ? (
                    eventData.map((data: any, index: number) => (
                      <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.company}</td>
                        <td>{data.vendor}</td>
                        <td className="dropdown action-label">
                          {data.status === null ? (
                            <>
                              <a
                                className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                                href="#"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {data.date[0]}
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                {data.date.map((date: any, index: any) => (
                                  <span className="dropdown-item" key={index}>
                                    {date}
                                  </span>
                                ))}
                              </div>
                            </>
                          ) : data.status === 'approve' ? (
                            data.date
                          ) : data.status === 'reject' ? (
                            'rejected'
                          ) : (
                            ''
                          )}
                        </td>
                        <td className="text-center">
                          <div className="action-label">
                            <a className="btn btn-white btn-sm btn-rounded">
                              <i
                                className={`fa fa-dot-circle-o ${
                                  data.status === null
                                    ? 'text-purple'
                                    : data.status === 'approve'
                                    ? 'text-success'
                                    : data.status === 'reject'
                                    ? 'text-danger'
                                    : ''
                                }`}
                              />
                              {data.status === null ? 'New' : data.status}
                            </a>
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
                            <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <i className="material-icons">more_vert</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#view_Event"
                                onClick={() => {
                                  const selectData = eventData.find((d: any) => {
                                    return d.id === data.id
                                  })
                                  setFormData(selectData)
                                  setModalOpen(true)
                                }}
                              >
                                <i className="fa fa-pencil m-r-5" /> View
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>no data</tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* View Event Modal */}
      {isModalOpen && (
        <div id="view_Event" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Event</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditData}>
                  <div className="form-group">
                    <label>Event Name</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>Event Location</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  {isEventDateVisible && Array.isArray(formData.date) && formData.date.length > 0 && (
                    <div className="form-group">
                      <label>
                        Event Date <span className="text-danger">*</span>
                      </label>
                      <select className="form-control" name="date" onChange={handleInputChange}>
                        <option>Select Event Date</option>
                        {formData.date.map((date: any, index: any) => (
                          <option value={date} key={index}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {isEventReasonVisible && (
                    <div className="form-group">
                      <label>
                        Event Reason <span className="text-danger">*</span>
                      </label>
                      <textarea
                        rows={4}
                        className="form-control"
                        name="remark"
                        value={formData.remark}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                  <div className="submit-section">
                    {!isEventDateVisible && !isEventReasonVisible && (
                      <>
                        <button className="btn btn-primary submit-btn" onClick={handleAccept}>
                          Accept
                        </button>
                        <button className="btn btn-primary submit-btn" onClick={handleReject}>
                          Reject
                        </button>
                      </>
                    )}
                    {isEventDateVisible || isEventReasonVisible ? (
                      <button className="btn btn-primary submit-btn">Save</button>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* View Event Modal */}
    </>
  )
}

export default ContentVendor
