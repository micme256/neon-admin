import Amount from "../elements/Amount";
import { formatDate } from "../elements/formaDate";
import { getName } from "../elements/getName";
import { formatAmount } from "../elements/formatAmount";

const RecentActivity = ({ recentActivity }) => {
  return (
    <div className="recent-activty">
      {recentActivity.map((activity) => (
        <div className="activity" key={activity.transactionId}>
          <div className="activuty-left">
            <div className="fname">{getName(activity.memberId)}</div>
            <div className={`trans-type loan-type ${activity.transactionType}`}>
              {activity.transactionType && activity.loanType
                ? `${activity.transactionType}-${activity.loanType}`
                : activity.transactionType || activity.loanType || null}
            </div>
            <Amount amount={activity.amount} />
          </div>
          <div className="activity-right">
            {activity.status && ( //SHOW LOAN STATUS IF LOAN ACTIVITY
              <div className={`${activity.status}`}>{activity.status}</div>
            )}
            <div className="date">
              {formatDate(new Date(activity.transactionDate))}
            </div>
            {activity.pendingInterest && (
              <div>Interest:{formatAmount(activity.pendingInterest)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
