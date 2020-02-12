
const db = require('../models');

async function ChangeSlotstatus(slotid, Status) {

    if (slotid != 0) {
        let Slot = await db.Slots.findOne({
            where: {
                IsActive: true,
                id: slotid
            }
        });

        if (Slot) {
            Slot.Status = Status;
            console.log('Slot', Slot);
            Slot.update({ Status: Status });
        }
    }
}

async function TimeOutSlotStatus(slotid) {
    console.log('TimeOut State');
    if (slotid != 0) {
        let Slot = await db.Slots.findOne({
            where: {
                IsActive: true,
                id: slotid,
                Status: 2
            }
        });

        if (Slot) {
            console.log('Slot', Slot);
            Slot.update({ Status: 1 });
        }
    }
}

function BookSlot(objbookslot) {
    return new Promise((resolve, reject) => {
        if (!objbookslot) {
            ChangeSlotstatus(objbookslot.SlotId, 1);
            reject({
                status: 0,
                message: 'Content should not be empty',
                data: null
            });
        }
        objbookslot.CreatedAt = new Date();
        objbookslot.CreatedBy = 1;
        db.Bookings.create(objbookslot)
            .then(data => {
                ChangeSlotstatus(objbookslot.SlotId, 3);
                resolve({ status: 1, message: 'Register Successfully!', data: data });
            }).catch(err => {
                ChangeSlotstatus(objbookslot.SlotId, 1);
                reject({
                    status: 0,
                    message: err.message || "Some error occurred while Booking slot.",
                    data: null
                });
            });
    });
};

exports.ChangeSlotstatus = ChangeSlotstatus;
exports.BookSlot = BookSlot;
exports.TimeOutSlotStatus = TimeOutSlotStatus;