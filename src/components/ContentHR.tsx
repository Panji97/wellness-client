import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EVENT_PROPS, createEvent, deleteEvent, editEvent, showEvent } from '../service/eventApi'
import { setEvent } from '../store/eventSlice'
import { allUser } from '../service/userApi'
import { setAllUser } from '../store/userSlice'

const ContentHR = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState<EVENT_PROPS>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const eventData = useSelector((state: any) => state.event.data)
  const eventVendor = useSelector((state: any) => state.user.dataAll)

  const handleVendorData = async () => {
    try {
      const response = await allUser()
      const responseVendor = response.result.filter((e: any) => e.username !== 'HR')

      dispatch(setAllUser(responseVendor))
    } catch (error) {
      return error
    }
  }

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
    handleVendorData()
  }, [])

  const handleCreateData = async (e: React.FormEvent) => {
    e.preventDefault()

    formData.date = [formData.date1 ?? null, formData.date2 ?? null, formData.date3 ?? null].filter(
      (date) => date !== null
    ) as Date[]

    const response = await createEvent(formData)

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

  const handleEditData = async (e: React.FormEvent) => {
    e.preventDefault()

    formData.date = [formData.date1 ?? null, formData.date2 ?? null, formData.date3 ?? null].filter(
      (date) => date !== null
    ) as Date[]

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

  const handleDeleteData = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await deleteEvent(formData)

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
            <div className="col-auto float-right ml-auto">
              <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_Event" onClick={() => setModalOpen(true)}>
                <i className="fa fa-plus" /> Add Event
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Event Statistics */}
        <div className="row">
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Total Event</h6>
              <h4>{eventData.length}</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Pending</h6>
              <h4>{eventData.filter((e: any) => e.status === null).length}</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Approve</h6>
              <h4>{eventData.filter((e: any) => e.status === 'approve').length}</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Reject</h6>
              <h4>{eventData.filter((e: any) => e.status === 'reject').length}</h4>
            </div>
          </div>
        </div>
        {/* /Event Statistics */}
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
                    <th>Created</th>
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
                        <td>
                          <h2 className="table-avatar">{data.created}</h2>
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
                                data-target="#edit_Event"
                                onClick={() => {
                                  const selectData = eventData.find((d: any) => d.id === data.id)
                                  setFormData(selectData)
                                  setModalOpen(true)
                                }}
                              >
                                <i className="fa fa-pencil m-r-5" /> Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#delete_approve"
                                onClick={() => {
                                  const selectData = eventData.find((d: any) => d.id === data.id)
                                  setFormData(selectData)
                                  setModalOpen(true)
                                }}
                              >
                                <i className="fa fa-trash-o m-r-5" /> Delete
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
      {/* Add Event Modal */}
      {isModalOpen && (
        <div id="add_Event" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Event</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateData}>
                  <div className="form-group">
                    <label>
                      Event Name <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" name="name" onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>
                      Vendor <span className="text-danger">*</span>
                    </label>
                    <select className="form-control" name="_vendor" onChange={handleInputChange}>
                      <option>Select Vendor</option>
                      {eventData &&
                        eventVendor.map((data: any, index: any) => (
                          <option key={index} value={data._id}>
                            {data.company}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      Location <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" name="location" onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>
                      Date 1 <span className="text-danger">*</span>
                    </label>
                    <input className="form-control datetimepicker" type="date" name="date1" onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>
                      Date 2 <span className="text-danger">*</span>
                    </label>
                    <input className="form-control datetimepicker" type="date" name="date2" onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>
                      Date 3 <span className="text-danger">*</span>
                    </label>
                    <input className="form-control datetimepicker" type="date" name="date3" onChange={handleInputChange} />
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /Add Event Modal */}
      {/* Edit Event Modal */}
      {isModalOpen && (
        <div id="edit_Event" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Event</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditData}>
                  <div className="form-group">
                    <label>
                      Event Name <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" name="name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>
                      Vendor <span className="text-danger">*</span>
                    </label>
                    <select className="form-control" name="_vendor" value={formData._vendor} onChange={handleInputChange}>
                      <option>Select Vendor</option>
                      {eventData &&
                        eventVendor.map((data: any, index: any) => (
                          <option key={index} value={data._id}>
                            {data.company}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      Location <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Date 1 <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control datetimepicker"
                      type="date"
                      name="date1"
                      value={
                        formData.date && formData.date[0]
                          ? new Date(formData.date[0]).toLocaleDateString('en-CA') // Format sesuai dengan elemen input type="date"
                          : ''
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Date 2 <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control datetimepicker"
                      type="date"
                      name="date2"
                      value={
                        formData.date && formData.date[1]
                          ? new Date(formData.date[1]).toLocaleDateString('en-CA') // Format sesuai dengan elemen input type="date"
                          : ''
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Date 3 <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control datetimepicker"
                      type="date"
                      name="date3"
                      value={
                        formData.date && formData.date[2]
                          ? new Date(formData.date[2]).toLocaleDateString('en-CA') // Format sesuai dengan elemen input type="date"
                          : ''
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /Edit Event Modal */}
      {/* Delete Event Modal */}
      {isModalOpen && (
        <div className="modal custom-modal fade" id="delete_approve" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Event</h3>
                  <p>Are you sure want to Cancel this Event?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a className="btn btn-primary continue-btn" onClick={handleDeleteData}>
                        Delete
                      </a>
                    </div>
                    <div className="col-6">
                      <a data-dismiss="modal" className="btn btn-primary cancel-btn">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /Delete Event Modal */}
    </>
  )
}

export default ContentHR
