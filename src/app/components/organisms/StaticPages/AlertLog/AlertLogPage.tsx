import './AlertLogPage.scss';

const AlertLogPage: React.FC = () => {
  return (
    <div className='alertlog'>
      <h2>Alert Log</h2>
      <i>Right now placed as placeholder...</i>
      <div className='alertlog__table-component'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Time</th>
              <th>Reference page</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src='./icons/alerts/alarm-unack.svg' /></td>
              <td>GPS 1 failed</td>
              <td>GPS 1 failed</td>
              <td>GPS 1 failed to fetch information from the MQTT broker.</td>
              <td>12:01</td>
              <td>203</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertLogPage;