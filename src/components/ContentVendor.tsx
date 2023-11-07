import { useDispatch, useSelector } from 'react-redux'
import { showEvent } from '../service/eventApi'
import { useEffect } from 'react'
import { setEvent } from '../store/eventSlice'

const ContentVendor = () => {
  const dispatch = useDispatch()

  const eventData = useSelector((state: any) => state.event.data)

  const handleShow = async () => {
    try {
      const response = await showEvent()

      dispatch(setEvent(response.result))
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    handleShow()
  }, [])
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
        {/* Event Statistics */}
        <div className="row">
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Annual Event</h6>
              <h4>12</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Medical Event</h6>
              <h4>3</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Other Event</h6>
              <h4>4</h4>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-info">
              <h6>Remaining Event</h6>
              <h4>5</h4>
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
                    <th>Tag</th>
                    <th>Date</th>
                    <th className="text-center">Status</th>
                    <th>Created</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData ? (
                    eventData.map((data: any, index: number) => (
                      <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.company}</td>
                        <td className="dropdown action-label">
                          <a
                            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                            href="#"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {data.vendor[0]}
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            {data.vendor.map((vendor: any, index: any) => (
                              <span className="dropdown-item" key={index}>
                                {vendor}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>{data.tag}</td>
                        <td className="dropdown action-label">
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
                        <td>
                          <h2 className="table-avatar">{data.created}</h2>
                        </td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
                            <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <i className="material-icons">more_vert</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_Event">
                                <i className="fa fa-pencil m-r-5" /> Edit
                              </a>
                              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_approve">
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
              <form>
                <div className="form-group">
                  <label>
                    Event Type <span className="text-danger">*</span>
                  </label>
                  <select className="select">
                    <option>Select Event Type</option>
                    <option>Casual Event 12 Days</option>
                    <option>Medical Event</option>
                    <option>Loss of Pay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    From <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <input className="form-control datetimepicker" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    To <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <input className="form-control datetimepicker" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Number of days <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" readOnly={false} type="text" />
                </div>
                <div className="form-group">
                  <label>
                    Remaining Events <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" readOnly={false} defaultValue={12} type="text" />
                </div>
                <div className="form-group">
                  <label>
                    Event Reason <span className="text-danger">*</span>
                  </label>
                  <textarea rows={4} className="form-control" defaultValue={''} />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Event Modal */}
      {/* Edit Event Modal */}
      <div id="edit_Event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Event</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    Event Type <span className="text-danger">*</span>
                  </label>
                  <select className="select">
                    <option>Select Event Type</option>
                    <option>Casual Event 12 Days</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    From <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <input className="form-control datetimepicker" defaultValue="01-01-2019" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    To <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <input className="form-control datetimepicker" defaultValue="01-01-2019" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Number of days <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" readOnly={false} type="text" defaultValue={2} />
                </div>
                <div className="form-group">
                  <label>
                    Remaining Events <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" readOnly={false} defaultValue={12} type="text" />
                </div>
                <div className="form-group">
                  <label>
                    Event Reason <span className="text-danger">*</span>
                  </label>
                  <textarea rows={4} className="form-control" defaultValue={'Going to hospital'} />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Event Modal */}
      {/* Delete Event Modal */}
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
                    <a className="btn btn-primary continue-btn">Delete</a>
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
      {/* /Delete Event Modal */}
    </>
  )
}

export default ContentVendor
